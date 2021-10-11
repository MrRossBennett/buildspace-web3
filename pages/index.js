import Head from 'next/head'

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-t from-gray-800 to-indigo-900 min-h-screen antialiased">
      <Head>
        <title>Adventures in Ethereum</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Press+Start+2P&display=swap" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-screen-xl mx-auto text-white flex flex-col justify-center pt-24 px-6 font-body">
        <header class="text-center mb-20">
          <h1 class="text-4xl font-display mb-6">Adventures in Ethereum</h1>
          <p class="text-xl tracking-wide">What happens next?</p>
        </header>

        <div class="grid grid-cols-2 gap-8 divide-x divide-dashed">
          <div class="col-span-1">
            <h2 class="font-display">Create your snippet</h2>
            <label class="block text-gray-700 my-8">
              <span class="sr-only">Snippet</span>
              <textarea class="mt-1 block w-full p-3 rounded-lg bg-indigo-900 resize-none text-white" rows="6" placeholder="Add snippet..."></textarea>
            </label>
            <button class="w-full sm:w-auto flex-none bg-pink-500 hover:bg-pink-600 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-pink-600 focus:outline-none transition-colors duration-200 inline-flex items-center">
              <span class="mr-3">Let's go!</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <div class="col-span-1 md:pl-6">
            <h2 class="font-display mb-8">Once upon a time...</h2>
            <ul class="text-white space-y-6">
              <li class="rounded-lg bg-indigo-900 p-6 relative">
                <div class="mb-4 flex justify-between text-indigo-200">
                  <p class="text-xs text-right">0x45638739...</p>
                  <p class="text-xs text-right">19th September 2021</p>
                </div>
                <article>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum diam iaculis lacinia tempor. Aliquam rhoncus lacus quis orci molestie, quis ultrices augue tempus. Donec rhoncus tortor dolor, sit amet iaculis nulla pretium vitae. In ultricies ultrices ligula, eget commodo massa tempor nec.</p>
                </article>
                <div class="w-full absolute inset-x-0 -bottom-8 inline-flex justify-center">
                  <div class="rounded-full bg-pink-500 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </li>
              <li class="rounded-lg bg-indigo-900 p-6">
                <div class="mb-4 flex justify-between text-indigo-200">
                  <p class="text-xs text-right">0x45638739...</p>
                  <p class="text-xs text-right">19th September 2021</p>
                </div>
                <article>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum diam iaculis lacinia tempor. Aliquam rhoncus lacus quis orci molestie, quis ultrices augue tempus. Donec rhoncus tortor dolor, sit amet iaculis nulla pretium vitae. In ultricies ultrices ligula, eget commodo massa tempor nec.</p>
                </article>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div >
  )
}