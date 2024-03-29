import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'inserat',
  title: 'Inserat',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Der Title ist wichtig für SEO und sollte kurz prägnant das Inserat beschreiben.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'heroSection',
      title: 'Hauptbeschreibung',
      type: 'heroSection',
    }),
    defineField({
      name: 'specification',
      title: 'Spezifikationen des Inserats',
      type: 'array',
      of: [{type: 'infoBox'}],
      validation: (Rule) => Rule.required(4),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Content',
      type: 'array',
      description:
        'Wähle aus welche Sektionen die Seite bestehen soll. Du kannst auch lediglich die Vorauswahl Editieren.',
      of: [
        {type: 'infoBande'},
        {type: 'corporateValueSection'},
        {type: 'imageCarouselSection'},
        {type: 'blockSection'},
        {type: 'convictionSection'},

        // {
        //   title: 'Reusable Section',
        //   type: 'reference',
        //   to: [{type: 'section'}],
        // },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
