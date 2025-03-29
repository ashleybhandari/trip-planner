import { useParams } from "react-router";

export default function ChecklistView() {
  const { checklistId } = useParams();
  return <p>checklist id: {checklistId}</p>;
}
