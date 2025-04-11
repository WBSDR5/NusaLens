// artikel
fetch('articles.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('articles');
    data.forEach(article => {
      const card = `
        <div class="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden">
          <div class="md:w-64 w-full h-64 md:h-auto">
            <img 
              class="w-full h-full object-cover object-center"
              src="${article.img}" 
              alt="${article.title}" 
            />
          </div>
          <div class="flex flex-col justify-between p-4 leading-normal w-full">
            <div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${article.title}</h5>
              <p class="clamp-4 text-gray-700 dark:text-gray-400">${article.desc}</p>
              </div>
            <div class="flex justify-end mt-4">
              <a href="post.html?id=${article.id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  })
  .catch(error => console.error('Gagal load artikel:', error));


// postingan artikel / info lebih lanjut
// Ambil ID dari URL
const params = new URLSearchParams(window.location.search);
const articleId = parseInt(params.get('id'), 10);

// Fetch data dari JSON
fetch('articles.json')
  .then(res => res.json())
  .then(data => {
    const article = data.find(a => a.id === articleId);
    if (!article) {
      document.getElementById('article-detail').innerHTML = "<p>Artikel tidak ditemukan.</p>";
      return;
    }

    // Render detail artikel
    document.getElementById('article-detail').innerHTML = `
        <div class="">
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">${article.title}</h1>
          <img src="${article.img}" alt="${article.title}" class="w-full h-96 rounded-2xl object-cover object-center my-6" />
          <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-2">${article.desc}</p>
        </div>
    `;
  })
  .catch(err => {
    console.error("Gagal memuat artikel:", err);
    document.getElementById('article-detail').innerHTML = "<p>Gagal memuat artikel.</p>";
  });

// wilayah indonesia
const apiKey = 'alq84Zth1ZncQMWrLwgf21nMjG88XHcj8KFuagBlzOzlvsKkH6CKy4ME';

function handleSearch(e) {
  e.preventDefault(); // Hindari reload
  const query = document.getElementById("searchInput").value;
  searchImages(query);
}

function searchImages(query) {
  fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=12`, {
    headers: {
      'Authorization': apiKey
    }
  })
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Kosongkan sebelum tampilkan yang baru
    data.photos.forEach(photo => {
      const imgElement = document.createElement('img');
      imgElement.src = photo.src.medium;
      imgElement.alt = photo.alt || query;
      imgElement.className = 'w-full h-64 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300';
      gallery.appendChild(imgElement);
    });
  })
  .catch(error => {
    console.error('Gagal mengambil gambar:', error);
  });
}