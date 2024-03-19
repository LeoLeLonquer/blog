---
layout: default-paginate
title: "Post-it"
permalink: tweets
pagination:
    enabled: true
    category: tweets
---

{%- assign posts = paginator.posts | default: site.tags.tweets -%}
{% for post in posts %}
    <article class="excerpt">
      {% include article_title.html post=post %}
      {{ post.excerpt }}
    </article>
{% endfor %}

{% if paginator.total_pages > 1 %}
  <aside>
    {% if paginator.previous_page %}<a href="{{ paginator.previous_page_path | relative_url }}">« newer posts</a>{% else %}<span></span>{% endif %}
    <span>page {{ paginator.page }} of {{ paginator.total_pages }}</span>
    {% if paginator.next_page %}<a href="{{ paginator.next_page_path | relative_url }}">older posts »</a>{% else %}<span></span>{% endif %}
  </aside>
{% endif %}