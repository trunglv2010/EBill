Vue.component('product', {
	props: ['product', 'index'],
	computed: {
		oldProduct: function () {
			return Object.assign({}, this.product);
		}
	},
	template: `
	<tr>
        <td v-if="product.mode == 'edit'">
        	<input type="text" v-model = "product.id">
        </td>
        <td v-else>
            {{ product.id }}
        </td>
        <td v-if="product.mode == 'edit'">
            <input type="text" v-model = "product.name">
        </td>
        <td v-else>
            {{ product.name }}
        </td>
            <td v-if="product.mode == 'edit'">
                <input type="text" v-model = "product.price"></input>
            </td>
            <td v-else>
            	{{ product.price }} 
        	</td>
            <td v-if="product.mode == 'edit'">
                <span class="icon"><a href="#" @click="$emit('save', index)" class="fa fa-check"></a></span> 
                <span class="icon"><a href="#" @click="$emit('cancel', oldProduct, index)" class="fa fa-ban"></a></span>
        	</td>
        	<td v-else>
        		<a href="#" @click="$emit('delete', index)" class="icon"><i class="fa fa-trash"></i></a>
            	<a href="#" @click="$emit('edit', index)" class="icon"><i class="fa fa-pencil"></i></a>
            	<a href="#" @click="$emit('show', product)" class="icon"><i class="fa fa-eye"></i></a>
        	</td>
        </td>
    </tr>
	`,
})

var app = new Vue({
    el: '#app',
    data: {
    	product: {
    		id: null,
    		name: null,
    		price: null,
    		mode: '',
    	},
    	productDetail: {
    		id: null,
    		name: null,
    		price: null,
    		mode: '',
    	}, 
        products: [
        	{id: 1, name: 'Product 1', price: '300', mode: ''},
        	{id: 2, name: 'Product 2', price: '300', mode: ''},
        	{id: 3, name: 'Product 3', price: '300', mode: ''},
        ],
        mode: '',
    },
    methods: {
    	addProduct: function (event) {
    		this.products.push(Object.assign({}, this.productDetail));
    	},

    	delProduct: function (key) {
    		this.products.splice(key,1);
    	},

    	showProduct: function (product) {
    		this.mode = 'detail';
    		this.productDetail = product;
    	},

    	editProduct: function (index) {
    		this.products[index].mode = 'edit';
    	},

    	saveProduct: function (index) {
    		this.products[index].mode = '';
    	},

    	cancelSaveProduct: function (oldProduct, index) {
    		let cloneVal = Object.assign({}, oldProduct);
			cloneVal.mode = '';
    		this.products.splice(index,1 ,cloneVal);
    	},

    	back: function () {
    		this.mode = '';
    	}
    }
})

