async function searchProducts() {
  const product = document.getElementById('product').value.trim();
  const weight = parseFloat(document.getElementById('weight').value);
  const suggestionsDiv = document.getElementById('suggestions');
  const resultDiv = document.getElementById('result');

  suggestionsDiv.innerHTML = '';
  resultDiv.innerHTML = '';

  if (!product || !weight || weight <= 0) {
    resultDiv.innerHTML = "⚠️ Введіть коректну назву продукту і вагу.";
    return;
  }

  try {
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(product)}&search_simple=1&action=process&json=1`);
    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      resultDiv.innerHTML = "❌ Продукт не знайдено.";
      return;
    }

    suggestionsDiv.innerHTML = '<strong>Оберіть продукт : </strong>';
    data.products.slice(0, 5).forEach((item, index) => {
      const name = item.product_name || 'Без назви';
      const photo = item.image_url || '';
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerHTML = `${index + 1}. ${name}` + (photo ? `<br><img src="${photo}" class="product-photo">` : '');
      div.onclick = () => calculateFromProduct(item, weight);
      suggestionsDiv.appendChild(div);
    });

  } catch (error) {
    resultDiv.innerHTML = "❌ Помилка під час пошуку.";
    console.error(error);
  }
}

function calculateFromProduct(item, weight) {
  const resultDiv = document.getElementById('result');
  const nutriments = item.nutriments;

  const kcal = ((nutriments['energy-kcal_100g'] || 0) * weight / 100).toFixed(2);
  const protein = ((nutriments['proteins_100g'] || 0) * weight / 100).toFixed(2);
  const fat = ((nutriments['fat_100g'] || 0) * weight / 100).toFixed(2);
  const carbs = ((nutriments['carbohydrates_100g'] || 0) * weight / 100).toFixed(2);

  resultDiv.innerHTML = `
    <strong>Обрано: ${item.product_name || 'Без назви'}</strong><br>
    Калорії: ${kcal} ккал<br>
    Білки: ${protein} г<br>
    Жири: ${fat} г<br>
    Вуглеводи: ${carbs} г
  `;
}