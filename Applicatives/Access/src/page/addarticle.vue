<template>
  <div class="command--page">
    <div class="wrapper bg-white mt-sm-5">
            <h4 class="pb-4 border-bottom">Ajouter un article</h4><br/>
            <form @submit.prevent="addArticle">
            <div class="form-group">
                <label for="firstname">Nom du produit</label>
                <input type="text" class="bg-light form-control" id="name" name="name" placeholder="Nom du produit" v-model="name">
            </div>
            <br/>
            <div class="form-group">
                <label for="lastname">Description du produit</label>
                <textarea type="textarea" class="bg-light form-control" id="keyWords" name="keyWords" placeholder="Description du produit" rows="3" v-model="keyWords"></textarea>
            </div>
            <br/>
              <div class="form-group">
                <label for="imgupload">Importer une image (400px/300px)</label>
                <br/>
                <input type="file" class="form-control-file" id="picture" name="picture">
            </div>
            <br/>
            <div class="form-group">
                <label for="price">Prix du produit</label>
                <input type="number" class="bg-light form-control" id="price" name="price" placeholder="Prix du produit" v-model="price">
            </div>
            </form>
            <br/> 
    </div>
</div>


</template>

<script>
import axios from "axios";
import {useRouter} from "vue-router";

export default {
    data() {
        return {
            
            name: "",
            price: "",
            keyWords: "",
        };
    },
    methods: {
        addArticle() {
            const credentials = {

                name: this.name,
                price: this.price,
                keyWords: this.keyWords,
            };

            const router = useRouter();

            axios({
                method: "POST",
                url: "http://10.176.128.135:3000/restaurant/article/",
                headers: {
                "token-api": "210acc4851961df7553144e8b1d77f6f"
                },
                data:credentials
                })
              .then((response) => console.log(response.data))
              .then(router.push('/adminresto'))
              .catch((err) => console.log(err.response));

            
            
        },
    },
    
};
</script>

<style>

</style>