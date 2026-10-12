import { redirect } from "next/navigation";

export default function HomePage() {
  // Automatiškai nukreipiame vartotoją į valdymo skydą
  redirect("/dashboard");
}