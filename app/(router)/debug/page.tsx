export default async function DebugPage() {
  const fetchData = async () => {
    const res = await fetch('http://43.202.29.134:8080/api/v1/test/ping');
    const data = await res.text();
    return data;
  };
  const data = await fetchData();

  return <h1>{data}</h1>;
}
