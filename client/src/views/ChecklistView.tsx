import { useParams } from "react-router";

export default function ChecklistView() {
  const { id } = useParams();
  return <p>checklist id: {id}</p>;
}
