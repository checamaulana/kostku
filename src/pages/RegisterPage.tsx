import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import Footer from "../components/Footer";
import { registerSchema, type RegisterFormData } from "../lib/authSchema";
import { supabase } from "../lib/supabaseClient"; // Import Supabase client

function RegisterPage() {
  const navigate = useNavigate(); // Inisialisasi hook navigasi
  const {
    register,
    handleSubmit,
    setError, // Untuk menampilkan error dari server
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
        },
      });

      if (error) {
        setError("root.serverError", {
          type: "manual",
          message: error.message,
        });
        alert(`Gagal mendaftar: ${error.message}`);
        return;
      }

      // Tampilkan pesan sukses dan arahkan ke halaman login
      alert("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.");
      navigate("/daftar-kost");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan tidak dikenal";
      setError("root.serverError", {
        type: "manual",
        message,
      });
      alert(`Error: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-pale-sky text-midnight-blue font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 brutalist-border brutalist-shadow">
            <h1 className="text-4xl font-black uppercase mb-6 text-center">
              DAFTAR AKUN
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* ... (input fields tidak berubah, sama seperti sebelumnya) ... */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold uppercase mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Nama Anda"
                  className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold uppercase mb-2"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="email@anda.com"
                  className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold uppercase mb-2"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-bold uppercase mb-2"
                >
                  Konfirmasi Password
                </label>
                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password"
                  className="w-full px-4 py-3 brutalist-border brutalist-shadow focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {/* Menampilkan error dari server */}
              {errors.root?.serverError && (
                <p className="text-red-500 text-sm">
                  {errors.root.serverError.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ocean-blue text-white py-4 font-bold text-lg uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "MEMPROSES..." : "DAFTAR"}
              </button>
            </form>
            <p className="text-center mt-6">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-bold text-ocean-blue hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegisterPage;
