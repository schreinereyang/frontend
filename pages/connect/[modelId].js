import { useRouter } from "next/router";

export default function ConnectPage() {
  const { query } = useRouter();
  return <div style={{ color: "white" }}>Connexion au modèle {query.modelId}</div>;
}
