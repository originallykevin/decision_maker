const url = window.location.href;
const urlID = url.substring(url.lastIndexOf('/') + 1);

$.get(`/admin/chart/${urlID}`)
  .then((response) => {
    const labels = [];
    const points = [];
    const colors = [];
    response.forEach(option => {
      labels.push(option.name);
      points.push(option.points);
      colors.push(createHexColor());
    });

    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: points,
        backgroundColor: colors,
        hoverOffset: 4
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
  });

const createHexColor = function() {
  const firstValue = Math.floor(Math.random() * (255 - 0) + 0);
  const secondValue = Math.floor(Math.random() * (255 - 0) + 0);
  const thirdValue = Math.floor(Math.random() * (255 - 0) + 0);

  return `rgb(${firstValue}, ${secondValue}, ${thirdValue})`;
}
