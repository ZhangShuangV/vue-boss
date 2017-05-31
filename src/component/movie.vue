<template>
    <div id="movie">
        <p>豆瓣电影排行榜1</p>
        <ul>
            <li v-for="article in articles">{{ article.title }}123</li>
        </ul>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                articles: []
            }
        },
        mounted: function () {
            this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
                headers: {

                },
                emulateJson: true
            }).then(function (response) {
                this.articles = response.data.subjects;
            }, function (response) {
                console.log(response);
            });
        }
    }
</script>
<style>
    #movie h1{
        line-height: 36px;
        color: #20A0FF;
    }
    #movie ul{
        width: 300px;
        margin: 0 auto;
        border: 1px solid blue;
    }
    #movie li{
        color: #333;
        display: block;
    }
</style>