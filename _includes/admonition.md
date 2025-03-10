{% if include.type.size > 0 and include.title.size > 0  %}
    {% assign types = "note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote" | split: ", " %}
    {% if types contains include.type %}
<div class="admonition {{ include.type }} rounded">
    <p class="admonition-title">{{ include.title }}</p>
    {% if include.body.size > 0 %}
<div markdown=1>
{{ include.body }}
</div>
    {% endif %}
</div>
    {% endif %}
{% endif %}