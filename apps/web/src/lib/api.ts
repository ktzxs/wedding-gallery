export type Photo = {
  id: string;
  url: string;
  guestName: string | null;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPhotos(): Promise<Photo[]> {
  try {
    const res = await fetch(`${API_URL}/photos`, { cache: "no-store" });
    if (!res.ok) throw new Error("Falha ao buscar fotos");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Não foi possível carregar as fotos agora.");
  }
}

export async function uploadPhoto(file: File, guestName: string): Promise<Photo> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (guestName) formData.append("guestName", guestName);

    const res = await fetch(`${API_URL}/photos`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Falha no upload");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível enviar a foto. Tenta de novo.");
  }
}