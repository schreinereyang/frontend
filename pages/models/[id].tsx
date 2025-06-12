import LayoutDashboard from "@/components/LayoutDashboard";
import CardSection from "@/components/CardSection";
import { useRouter } from "next/router";

export default function ModelDetails() {
  const { query } = useRouter();

  return (
    <LayoutDashboard>
      <div className="mb-4 text-2xl font-bold text-purple-300">Détail de la modèle</div>
      <CardSection>
        ID: {query.id}
      </CardSection>
    </LayoutDashboard>
  );
}
