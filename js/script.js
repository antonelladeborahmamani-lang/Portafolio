
  // Typing effect for hero SQL query
  const queryEl = document.getElementById('query-line');
  const resultRow = document.getElementById('result-row');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parts = [
    {text:'SELECT ', cls:'kw'},
    {text:'nombre, rol, pasion ', cls:'col'},
    {text:'FROM ', cls:'kw'},
    {text:'desarrolladores ', cls:'col'},
    {text:'WHERE ', cls:'kw'},
    {text:"nombre = 'antonella_mamani';", cls:'str'}
  ];
  const fullText = parts.map(p=>p.text).join('');

  function typeQuery(){
    if(prefersReduced){
      queryEl.innerHTML = '<span class="prompt">mysql&gt; </span>' + fullText;
      resultRow.classList.add('show');
      return;
    }
    let i = 0;
    const speed = 28;
    function step(){
      if(i <= fullText.length){
        queryEl.innerHTML = '<span class="prompt">mysql&gt; </span>' + fullText.slice(0,i) + '<span class="cursor"></span>';
        i++;
        setTimeout(step, speed);
      } else {
        queryEl.innerHTML = '<span class="prompt">mysql&gt; </span>' + fullText;
        setTimeout(()=> resultRow.classList.add('show'), 200);
      }
    }
    step();
  }
  window.addEventListener('load', typeQuery);

  // Scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.15});

  document.querySelectorAll('.record, .schema, .beyond-card').forEach(el=> io.observe(el));