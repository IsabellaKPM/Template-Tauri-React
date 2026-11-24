import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";

export default function Logo() {
  return (
    <Link to={ROUTES.home}>
      <div className="text-xl font-bold">Template Tauri React</div>
    </Link>
  );
}
