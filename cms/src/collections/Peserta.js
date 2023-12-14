/** @type {import('payload/types').CollectionConfig} */
const Peserta = {
    slug : "peserta",
    admin : {
      useAsTitle : "nama"
    },
    fields : [
      {
        name: "nama",
        type: "text",
        required: true,
      },
      {
        name: "email",
        type: "email",
        required: true,
        unique : true
      },
      {
        name: "asalSekolah",
        type: "text",
        required: true,
      },
      {
        name: 'status',
        type: 'select',
        options: [
            {
                label: 'Waiting',
                value: 'waiting',
            },
            {
                label: 'Rejected',
                value: 'rejected',
            },
            {
                label: 'Accepted',
                value: 'accepted',
            },
        ],
        defaultValue: 'waiting',
        },
      {
        name: 'date',
        type: 'date',
        admin: {
          date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyy',
          },
        },
        defaultValue: Date(),
      },
    ]
  }
  
  export default Peserta