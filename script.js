document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quiz');
  const resultEl = document.getElementById('result');
  const resetBtn = document.getElementById('reset');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const counts = { A: 0, B: 0, C: 0 };
    for (let i = 1; i <= 10; i++) {
      const key = 'q' + i;
      const val = data.get(key);
      if (!val) {
        alert('すべての質問に回答してください。');
        return;
      }
      if (counts[val] !== undefined) counts[val]++;
    }

    // Determine dominant (handle ties)
    const maxCount = Math.max(counts.A, counts.B, counts.C);
    const winners = Object.keys(counts).filter(k => counts[k] === maxCount);

    const messages = {
      A: { title: '視覚優位（Visual）', text: '見たものを見た通りに記憶するのが得意なタイプです。写真やイラストが豊富で印象的な参考書を選んだり、動画講義やその分野に関係したドキュメンタリーや映画を観たりするのがおすすめです。ノートを取る際には、書く場所を意識してページ全体をイメージとして覚えるとよいでしょう。「読んで覚える」より「見て覚える」感覚を意識してみましょう。' },
      B: { title: '言語優位（Verbal）', text: '文章をしっかり読み込んで情景や状況をイメージしたり、読んだ文章を自分なりに図式化したりするのが得意なタイプです。参考書を探すときは、図や絵よりも、文章が分かり易く頭に入ってくるものを優先するのがおすすめ。単語の暗記などは使っている情景やストーリーを思い浮かべながら覚えるとよいかもしれません。文法など「仕組み」を理解することで学習が捗るタイプの人もいます。板書を写すだけのノートは無意味なので、自分なりに整理してアウトプットしましょう。' },
      C: { title: '聴覚優位（Auditory）', text: '耳から入る情報を処理・記憶するのが得意なタイプです。声に出して読み上げる、録音したものを聞く、といった「音」を活用した勉強法がおすすめ。ラジオ講座やリスニング教材を活用する場合、より印象的な声や話し方をしているものを探すとよいかもしれません。会話の多いカフェなどでの学習は向いていません。その場合は、ノイズキャンセリングが必須です。' }
    };

    resultEl.hidden = false;

    if (winners.length === 1) {
      const key = winners[0];
      resultEl.innerHTML = `<h2>${messages[key].title}</h2>
        <p>${messages[key].text}</p>
        <p><strong>集計：</strong> A=${counts.A} / B=${counts.B} / C=${counts.C}</p>`;
    } else {
      // Multiple winners — show each result
      const parts = winners.map(k => `<section><h3>${messages[k].title}</h3><p>${messages[k].text}</p></section>`).join('');
      const title = winners.map(k => messages[k].title.split('（')[0]).join(' ＆ ');
      resultEl.innerHTML = `<h2>混合タイプ: ${title}</h2>
        ${parts}
        <p><strong>集計：</strong> A=${counts.A} / B=${counts.B} / C=${counts.C}</p>`;
    }

    resultEl.scrollIntoView({behavior:'smooth'});
  });

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Reload the page to fully reset state
    window.location.reload();
  });
});
