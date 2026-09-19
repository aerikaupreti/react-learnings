import { BrowserRouter, Route, Routes } from "react-router-dom";
import AssignmentList from "../src/component/FormLearnings/assignment/AssignmentList";
import CreateAssignment from "../src/component/FormLearnings/assignment/CreateAssignment";
import CreateProduct from "../src/component/FormLearnings/ProductForm/CreateProduct";
import EventRegistration from "../src/component/FormLearnings/EventRegistration/EventRegistration";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AssignmentList />} />
          <Route path="/assignments" element={<AssignmentList />} />
          <Route path="/assignments/new" element={<CreateAssignment />} />
          <Route path="/product/new" element={<CreateProduct />} />
          <Route path="/event/new" element={<EventRegistration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
