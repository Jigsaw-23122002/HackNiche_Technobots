import React, { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { createClient } from "@supabase/supabase-js";
import Base from "@layouts/Baseof";
import PostSingle2 from "@layouts/PostSingle2";
import { markdownify } from "@lib/utils/textConverter";
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
    const frontmatter = { title: "Login required" };
    const content = "content";
    const data = {
      frontmatter,
      content,
    };
    return (
      <>
        <Base>
          <section className="section">
            <div className="container">
              <div className="flex h-[40vh] items-center justify-center">
                <div className="text-center">
                  <h1 className="mb-4">Page not found"</h1>
                  {markdownify("Authentication required", "div", "content")}
                </div>
              </div>
            </div>
          </section>
        </Base>
      </>
    );
  } else {
    return (
      <Base title={"hi"}>
        <div>
          {list.map((data) => {
            return (
              <div>
                <PostSingle2
                  timestamp={data.created_at}
                  status={data.isSent}
                  image={data.svg}
                  link={data.download_link}
                />
              </div>
            );
          })}
        </div>
      </Base>
    );
  }
}
