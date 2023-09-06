/* import type { NoSerialize } from "@builder.io/qwik";
import { $, component$, noSerialize, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

const stream = server$(async function* () {
  const response = await fetch(this.url.origin + "/assets/Sparks.mp4");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    // converter value to int array normal
    // const uint8Array = new Uint8Array(value);
    // const intArray = uint8Array.map((item) => item);
    yield [...value];
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});

export default component$(() => {
  const videoRef = useSignal<HTMLVideoElement>();
  const responseSig = useSignal<
    NoSerialize<AsyncGenerator<Uint8Array, void, unknown>> | undefined
  >(undefined);

  const appendBuffer = $(async (sourceBuffer, data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      sourceBuffer.addEventListener("updateend", resolve);
      sourceBuffer.addEventListener("error", reject);
      sourceBuffer.appendBuffer(data);
    });
  });

  const handleStart = $(async () => {
    if (!responseSig.value) {
      const response = await stream();
      responseSig.value = noSerialize(response);
    }

    if (videoRef.value) {
      const mediaSource = new MediaSource();
      videoRef.value.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener("sourceopen", async () => {
        const mySourceBuffer = mediaSource.addSourceBuffer(
          "video/mp4; codecs=avc1.42E01E,mp4a.40.2"
        );

        while (true) {
          const datum = await responseSig.value!.next();
          if (datum.done) {
            mediaSource.endOfStream();

            break;
          }

          await appendBuffer(mySourceBuffer, new Uint8Array(datum.value));
        }
      });
    }
  });

  return (
    <div>
      <button onClick$={handleStart}>start</button>
      <video ref={videoRef} controls></video>
    </div>
  );
});
 */
