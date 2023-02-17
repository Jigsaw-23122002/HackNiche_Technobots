import React, { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Request() {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);

  const getRequestedDocs = async () => {
    const result = await supabase
      .from("requests")
      .select()
      .eq("email", localStorage.getItem("email"));
    setList(result.data);
    console.log(result);
  };

  useEffect(() => {
    setUser(localStorage.getItem("email"));
    getRequestedDocs();
  }, []);

  if (user === null) {
    return (
      <>
        <div>Require to login</div>
      </>
    );
  } else {
    return (
      <div>
        {list.map((data) => {
          return (
            <div>
              {JSON.stringify(data)}
              <p>
                <SVG src={data.svg} width={100} height="auto" title="Menu" />
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
