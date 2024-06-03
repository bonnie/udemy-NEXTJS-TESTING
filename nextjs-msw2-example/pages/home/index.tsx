import React from "react";

export default function Home() {
  const [description, setDescription] = React.useState<string>();
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">(
    "loading"
  );

  React.useEffect(() => {
    fetch("http://localhost:3000/api/description")
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.description);
        setStatus("idle");
      })
      .catch((e) => {
        console.error(e);
        setStatus("error");
      });
  }, []);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Error</h1>;
  }
  // will be "actual response" if the response comes from the api endpoing;
  // will be "MSW response" if the response comes from MSW
  return <h1>{description}</h1>;
}
