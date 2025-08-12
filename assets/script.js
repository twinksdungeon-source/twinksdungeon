document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const gate = document.getElementById('age-gate');
  const enterBtn = document.getElementById('enterBtn');
  const KEY = 'age_gate_ok';
  const HOURS_24 = 24 * 60 * 60 * 1000;

  function showGateIfNeeded(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw){ gate.classList.remove('hidden'); return; }
      const data = JSON.parse(raw);
      if(Date.now() - data.ts > HOURS_24){
        gate.classList.remove('hidden');
      }
    }catch(_){
      gate.classList.remove('hidden');
    }
  }
  if(gate){ showGateIfNeeded(); }
  if(enterBtn){
    enterBtn.addEventListener('click', () => {
      localStorage.setItem(KEY, JSON.stringify({ ok:true, ts: Date.now() }));
      gate.classList.add('hidden');
    });
  }
});