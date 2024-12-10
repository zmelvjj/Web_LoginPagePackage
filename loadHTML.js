fetch("LiveServerModule/LiveServer.html")
  .then((res) => res.text())
  .then((data) => {
    const modalContent = document.createElement("div");
    document.body.appendChild(modalContent);
    modalContent.id = "modalContent";
    modalContent.innerHTML = data;

    const scripts = modalContent.querySelectorAll("script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");

      if (script.src) {
        // 외부 스크립트 처리
        newScript.src = script.src;
        newScript.async = false; // 동기 로드로 순서 보장
      } else {
        // 인라인 스크립트 처리
        newScript.textContent = script.textContent;
      }

      document.body.appendChild(newScript);
    });
  })
  .catch((err) => console.error("Fetch error:", err));
