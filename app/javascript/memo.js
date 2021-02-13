function memo () {
  // 投稿ボタンのidを取得
  const submit = document.getElementById("submit");
  // クリックした場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // new FormData(フォーム要素);でオブジェクトを生成しフォームに入力された値を取得できる。
    const formData = new FormData(document.getElementById("form"));
    // XMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容を追記（初期化）(HTPメソッド、パス、非同期通信)
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    // sendでリクエストを送信する
    XHR.send(formData);
    // 200以外のHTTPステータスが返却された場合の処理
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する要素の親要素のlistを取得
      const list = document.getElementById("list");
      // メモの入力フォームを取得
      const formText = document.getElementById("content");
      // メモとして描画する部分のHTMLを定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // 要素.insertAdjacentHTML("afterend", HTML);で要素のどこに描画するのかを指定
      list.insertAdjacentHTML("afterend", HTML);
      // メモの入力フォームに入力されたままの文字をリセット
      formText.value = "";      
    };
    e.preventDefault();
  });
}

window.addEventListener("load", memo);
