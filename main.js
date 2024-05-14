window.addEventListener('keydown',function(A){
    const audio = document.querySelector( 'audio[data-key=" ${A.keycode}"]');
console.log(audio);
});
function removeTransition(A) {
    if (A.propertyName !== 'transform') return;
    A.target.classList.remove('playing');
  }

  function playSound(A) {
    const audio = document.querySelector(`audio[data-key="${A.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${A.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);