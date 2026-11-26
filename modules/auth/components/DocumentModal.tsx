"use client";

import React, { useState, useTransition, useRef } from "react";
import { uploadDocumentAction, giveConsentAction } from "../actions";
import { DocumentWithRequirement, DocumentActionResult } from "../types";

interface DocumentModalProps {
  document: DocumentWithRequirement | null;
  isOpen: boolean;
  onClose: () => void;
  isEmailVerified: boolean;
  hasConsent: boolean;
  onConsentGiven: () => void;
  onUploadSuccess: () => void;
}

export default function DocumentModal({
  document,
  isOpen,
  onClose,
  isEmailVerified,
  hasConsent,
  onConsentGiven,
  onUploadSuccess,
}: DocumentModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<"detail" | "preview" | "uploading" | "success">("detail");
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen || !document) return null;

  // Reset internal states when modal opens
  const handleClose = () => {
    setSelectedFile(null);
    setErrorMessage(null);
    setStep("detail");
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // US-04 AC4 & W-04.6: Validasi ekstensi & ukuran maks 5 MB
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    const validExts = [".pdf", ".jpg", ".jpeg", ".png"];

    if (!validExts.includes(ext) && !allowed.includes(file.type)) {
      setErrorMessage("Format file tidak didukung. Gunakan PDF, JPG, atau PNG.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Ukuran file melebihi 5 MB. Pilih file yang lebih kecil.");
      return;
    }

    setSelectedFile(file);
    setStep("preview"); // W-04.7: Pratinjau dan Kirim
  };

  const handleConsentAgreement = () => {
    startTransition(async () => {
      const res = await giveConsentAction("pemrosesan_data_pribadi");
      if (res.success) {
        onConsentGiven();
      }
    });
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) return;

    setStep("uploading"); // W-04.8: Indikator Proses
    startTransition(async () => {
      const formData = new FormData();
      formData.append("requirementId", document.id);
      formData.append("file", selectedFile);

      const result = await uploadDocumentAction(null, formData);

      if (result.success) {
        setStep("success"); // W-04.10: Progres Terbaru
        onUploadSuccess();
      } else {
        setStep("preview");
        setErrorMessage(result.message || "Gagal mengunggah dokumen. Silakan coba lagi.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5170FF]" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {document.kategori}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* Kondisi 1: Email belum terverifikasi (US-04 AC1 / W-VE.5) */}
          {!isEmailVerified && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
                !
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Verifikasi Email Diperlukan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Anda harus memverifikasi alamat email Anda sebelum dapat mengunggah dokumen persyaratan SCF.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href="/verify-otp"
                  className="px-4 py-2 bg-[#5170FF] text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition"
                >
                  Verifikasi Sekarang →
                </a>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          {/* Kondisi 2: Belum Setujui Kebijakan Privasi (US-04 AC2 / W-04.1) */}
          {isEmailVerified && !hasConsent && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5170FF] flex items-center justify-center mx-auto text-xl font-bold">
                ℹ
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Setujui Pemrosesan Data Pribadi
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Untuk menjaga keamanan dan memproses kurasi dokumen SCF Anda secara aman, mohon berikan persetujuan pemrosesan data pribadi sesuai UU PDP.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleConsentAgreement}
                  disabled={isPending}
                  className="px-5 py-2.5 bg-[#5170FF] text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition cursor-pointer"
                >
                  {isPending ? "Menyimpan..." : "Saya Setuju & Lanjutkan"}
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50 transition"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* Kondisi 3: Alur Normal Unggah (W-04.4 - W-04.10) */}
          {isEmailVerified && hasConsent && (
            <>
              {/* Step Detail: W-04.4 */}
              {step === "detail" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {document.nama}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {document.deskripsi}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Status Saat Ini:</span>
                      <span className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                        document.statusKurasi === "Lengkap & Valid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : document.statusKurasi === "Perlu Revisi"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        {document.statusKurasi}
                      </span>
                    </div>
                    {document.namaFile && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">File Terunggah:</span>
                        <span className="font-mono text-slate-800 text-[11px] truncate max-w-[200px]">
                          {document.namaFile} ({Math.round((document.ukuranKb || 0) / 1024 * 10) / 10} MB)
                        </span>
                      </div>
                    )}
                    {document.catatanTindakan && (
                      <div className="text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                        <span className="font-semibold text-slate-700">Catatan Kurasi: </span>
                        {document.catatanTindakan}
                      </div>
                    )}
                  </div>

                  {/* Ketentuan file & pesan error W-04.6 */}
                  <div className="rounded-xl p-3 bg-blue-50/50 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
                    <strong>Ketentuan File:</strong> Format PDF, JPG, atau PNG. Ukuran maksimal 5 MB.
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <span>(!)</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                    >
                      Tutup
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2.5 bg-[#5170FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>{document.uploaded ? "Ganti File Berkas" : "Pilih File & Unggah"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step Preview: W-04.7 */}
              {step === "preview" && selectedFile && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Pratinjau File Berkas
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Periksa nama dan ukuran file sebelum dikirimkan untuk kurasi.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-[#5170FF] flex items-center justify-center mx-auto text-xl font-bold">
                      📄
                    </div>
                    <div className="font-mono text-xs font-bold text-slate-800 break-all">
                      {selectedFile.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Ukuran: {Math.round(selectedFile.size / 1024)} KB ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <span>(!)</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("detail")}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleUploadSubmit}
                      disabled={isPending}
                      className="px-5 py-2.5 bg-[#5170FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>Kirim Dokumen</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step Uploading: W-04.8 */}
              {step === "uploading" && (
                <div className="py-8 text-center space-y-4">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-[#5170FF]" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Mengunggah dokumen...
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedFile?.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Mohon jangan menutup jendela ini.
                    </p>
                  </div>
                </div>
              )}

              {/* Step Success: W-04.10 */}
              {step === "success" && (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Dokumen Berhasil Diunggah!
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Berkas persyaratan telah diperbarui dengan status lengkap dan siap diikutsertakan dalam kurasi platform SCF.
                    </p>
                  </div>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Selesai & Tutup
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
