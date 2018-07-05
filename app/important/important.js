////////////////plus-minus input///////////////

// count plus/minus
if (document.querySelector('.js-count')) {

    let counts = document.querySelectorAll('.js-count');

    for (let i = 0; i < counts.length; ++i) {
        counts[i].querySelector('.js-count-min').addEventListener('click', function () {
            let thisValue = counts[i].querySelector('.js-count-input').value;
            if (thisValue > 1) {
                counts[i].querySelector('.js-count-input').value = thisValue - 1;
            }
        });

        counts[i].querySelector('.js-count-max').addEventListener('click', function () {
            let thisValue = counts[i].querySelector('.js-count-input').value;
            counts[i].querySelector('.js-count-input').value = +thisValue + 1;
        });

        // prevent input not numbers
        counts[i].querySelector('.js-count-input').addEventListener('input', function () {
            this.value = this.value.replace(/\D/gi, '').replace(/^0+/, '');
        });

        document.body.addEventListener('click', function () {
            let thisValue = counts[i].querySelector('.js-count-input').value;
            if (!thisValue) {
                counts[i].querySelector('.js-count-input').value = 1;
            }
        });
    }
}
