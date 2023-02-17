import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const Posts = ({ posts }) => {
  const { blog_folder, summary_length } = config.settings;
  const [status, setStatus] = useState("");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const requestDoc = async () => {
    const { data, error } = await supabase
      .from("requests")
      .insert({ email: localStorage.getItem("email"), isSent: false, svg: "" })
      .select();
    console.log(data);
    console.log(error);
  };

  const requestStatus = async () => {
    const result = await supabase
      .from("requests")
      .select()
      .eq("email", localStorage.getItem("email"));
    if (result.data.length === 0) {
      setStatus("Request");
    } else {
      setStatus("Requested");
    }
  };

  useEffect(() => {
    requestStatus();
  }, []);

  return (
    <div className="section row pb-0">
      <div className="col-12 pb-12 lg:pb-24">
        <div className="row items-center">
          <div className="col-12 md:col-6">
            {posts[0].frontmatter.image && (
              <Image
                className="h-auto w-full rounded-lg"
                src={posts[0].frontmatter.image}
                alt={posts[0].frontmatter.title}
                width={540}
                height={227}
                priority={true}
              />
            )}
          </div>
          <div className="col-12 md:col-6">
            <h2 className="h3 mb-2 mt-4">
              <Link
                href={`/${blog_folder}/${posts[0].slug}`}
                className="block hover:text-primary"
              >
                {posts[0].frontmatter.title}
              </Link>
            </h2>
            <p className="text-text">
              {plainify(
                posts[0].content?.slice(0, Number(summary_length)),
                "div"
              )}
            </p>
            <Link
              aria-disabled={status == "Requested"}
              className="btn btn-primary mt-4"
              href={``}
              rel=""
              onClick={() => requestDoc()}
            >
              {status}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
