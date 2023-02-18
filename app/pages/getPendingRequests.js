import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Base from "@layouts/Baseof";
import PostSingle3 from "@layouts/PostSingle3";
import { markdownify } from "@lib/utils/textConverter";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Request() {
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);

  const getPendingRequests = async () => {
    try {
      const data = [];
      const result = await supabase.from("requests").select();
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].isSent === false) {
          data.push(result.data[i]);
        }
      }
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(localStorage.getItem("email"));
    getPendingRequests();
  }, []);
  if (user === null) {
    return (
      <>
        <Base>
          <section className="section">
            <div className="container">
              <div className="flex h-[40vh] items-center justify-center">
                <div className="text-center">
                  <h1 className="mb-4">Page not found</h1>
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
      <div>
        <Base>
          {list.map((data) => {
            return (
              <div className="">
                <div>
                  <PostSingle3
                    timestamp={data.email}
                    status={data.isSent}
                    image={data.svg}
                    id={data.id}
                  />
                </div>
              </div>
            );
          })}
        </Base>
      </div>
    );
  }
}
