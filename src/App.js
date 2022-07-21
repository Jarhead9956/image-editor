import Card from "./UI/Card";
import Layout from "./Layout/Layout";
import Editor from "./components/editor/Editor";

function App() {
  return (
    <Layout>
      <Card>
        <Editor />
      </Card>
    </Layout>
  );
}

export default App;
