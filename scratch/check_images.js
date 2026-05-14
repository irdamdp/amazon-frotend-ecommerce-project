import axios from 'axios';

async function checkEmptyImages() {
    try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/products');
        const empty = res.data.filter(p => !p.images || p.images.length === 0 || !p.images[0]);
        console.log('Total products with empty images:', empty.length);
        if (empty.length > 0) {
            console.log('Sample product with empty images:', empty[0].title, 'Category:', empty[0].category.name);
        }
    } catch (err) {
        console.error(err.message);
    }
}

checkEmptyImages();
