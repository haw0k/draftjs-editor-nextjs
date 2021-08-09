import Head from "next/head";
import React, { useCallback, useState } from "react";
import DraftjsEditor from "../components/draftjs_editor";

const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";

export default function Home() {
  const [text, setText] = useState(html);

  const changeText = useCallback(
    (msg: string) => {
      setText(msg);
    },[setText]
  ) 

  return (
    <>
      <Head>
        <title>Draftjs HTML Next.js textarea demo</title>
        <meta
          name='description'
          content='Draftjs HTML textarea nextjs demo project'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <h1 className='title'>Draftjs HTML Next.js textarea demo</h1>
        <DraftjsEditor initialValue={html} onChange={changeText} />
      </main>

      <footer className='footer'>
        <textarea
          disabled
          value={text}
        />
      </footer>
    </>
  );
}


