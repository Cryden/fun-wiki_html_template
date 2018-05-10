<template>
  <div>
    <h3 class="sidebar-title"> Купить книгу </h3>
    <ul v-for="item in topadvert.items" :key="item.id">
      <li>
        {{ item.title }}
        {{ item.shop_name }}
        <a  v-bind:href = "item.url" > >>>> </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'topadvert',
  data () {
    return {
      topadvert: ''
    }
  },
  props: ['title', 'isbn', 'author'],
  created: function () {
    var apiURL = 'https://feed.adrelayer.com/feed?encode=jscomp&post_message=1&load_event=page~xload&feed_id=12990&pattern_id=8903&book_author=~Q_ru_panov~Q&book_name=~Q_ru_ten~m+inkvizitora~Q&context_title=_ru_ten~m+inkvizitora';

    this.getJSON(this.getURL(this.title, this.isbn, this.author))

    console.log(this.getURL(this.title, this.isbn, this.author))
  },
  methods: {
    getJSON: function(api_url) {
      var self = this;

      $.ajax({
        url: api_url,
        crossDomain: true,
        type: 'POST',
        dataType: "script",
        success: function() {
          console.log ('Success')
          self.topadvert = topadvert_feed
        }
      })
    },
    getURL: function (title, author, isbn) {
      console.log (title)
      console.log (author)
      console.log (isbn)
      return 'https://feed.adrelayer.com/feed?encode=jscomp&post_message=1&load_event=page~xload&feed_id=12990&pattern_id=8903&book_author=~Q_ru_'+author+'~Q&book_name=~Q_ru_'+title+'~Q&context_title=_ru_'+title+'&book_isbn='+isbn
    }
  }
}
</script>
