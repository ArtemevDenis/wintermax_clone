const FakeNews = [
    {
        id: 1231,
        title: "title 1",
        date: "20.01.2020",
        link: "/news/739212",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut est nibh, porta ac imperdiet at, tristique eu ipsum. Ut facilisis, magna vel venenatis vulputate, turpis arcu finibus risus, sed ornare mi ligula efficitur nibh. Suspendisse mattis diam et augue rhoncus, euismod ornare purus elementum. Morbi viverra tristique enim, vel aliquam arcu commodo eu. Integer ligula sem, eleifend vel odio id, facilisis fringilla neque. Cras posuere nisi nec cursus sagittis. Donec nulla lacus, mattis vitae sollicitudin ut, pharetra et dolor. Fusce porttitor non justo vulputate ornare. Praesent in porta lacus, ac euismod odio.\n" +
            "\n" +
            "Maecenas ornare posuere lacus ut rhoncus. Vivamus id facilisis arcu. Morbi accumsan felis at massa interdum fringilla. Maecenas pulvinar faucibus purus eget aliquet. Donec sollicitudin justo eu posuere mollis. Praesent ut augue efficitur, interdum diam sed, egestas mi. Suspendisse id condimentum libero. Nullam ultricies risus ut viverra aliquam. Vivamus molestie odio ex, sit amet suscipit ante feugiat in. Suspendisse vestibulum sapien id dapibus lobortis. In eget ante vel dui interdum dapibus a ut dolor. Curabitur vitae tincidunt nisi, quis varius urna. Integer eleifend tellus vitae diam suscipit, nec commodo odio tempor. Sed lorem turpis, rutrum eu egestas a, feugiat nec ipsum.\n" +
            "\n" +
            "Aliquam faucibus neque eu libero eleifend posuere. Fusce vel est et risus mattis accumsan. Suspendisse cursus ultricies nisi eu dignissim. Phasellus pulvinar nunc a lorem lacinia hendrerit. Nullam porttitor tempus tincidunt. Aliquam tristique diam quis eros maximus, nec viverra sapien dignissim. Etiam id erat eu nibh venenatis rutrum vitae id tortor. Integer finibus, erat quis dictum luctus, turpis orci vestibulum erat, sed tincidunt velit nisi sed odio. Etiam aliquam convallis rutrum. Vestibulum scelerisque elit ac justo bibendum, ut molestie augue auctor. Donec id erat arcu. Vestibulum dapibus ex a leo feugiat, sed condimentum magna porta. Sed placerat est neque. Etiam blandit ornare nunc ac pellentesque. Quisque vulputate condimentum erat, vitae interdum massa fringilla ac.\n" +
            "\n" +
            "Nunc lobortis blandit orci, id pretium elit condimentum non. Morbi at metus non lacus viverra volutpat sed quis lectus. Aenean commodo eleifend enim, non varius arcu varius ac. Etiam pretium varius malesuada. Vestibulum a accumsan lorem. Vestibulum elementum eleifend felis sed vulputate. Etiam euismod massa tempus, lacinia odio vitae, pharetra nunc. Curabitur dignissim iaculis ipsum id blandit. Donec at dui sit amet dolor eleifend cursus. Nulla facilisi. Mauris ultrices neque nec dui pulvinar maximus.\n" +
            "\n" +
            "Morbi tempor diam at mauris interdum, a ultricies urna rhoncus. Fusce imperdiet nisl felis, vel lacinia tortor faucibus sed. Vivamus sagittis sodales euismod. Maecenas accumsan, libero et elementum lobortis, dui nibh condimentum arcu, a pharetra purus tellus eget est. Etiam blandit rutrum bibendum. Ut eleifend accumsan risus. Vivamus nisi mi, tincidunt vel lobortis in, porta eu sapien. Curabitur nec quam in quam consequat vehicula a eu elit."
    },
    {
        id: 1232,
        title: "title 2",
        date: "18.01.2020",
        link: "/news/739212",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
        id: 761453231232,
        title: "title 3",
        date: "15.01.2020",
        link: "/news/739212",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut est nibh, porta ac imperdiet at, tristique eu ipsum. Ut facilisis, magna vel venenatis vulputate, turpis arcu finibus risus, sed ornare mi ligula efficitur nibh. Suspendisse mattis diam et augue rhoncus, euismod ornare purus elementum. Morbi viverra tristique enim, vel aliquam arcu commodo eu. Integer ligula sem, eleifend vel odio id, facilisis fringilla neque. Cras posuere nisi nec cursus sagittis. Donec nulla lacus, mattis vitae sollicitudin ut, pharetra et dolor. Fusce porttitor non justo vulputate ornare. Praesent in porta lacus, ac euismod odio.\n" +
            "\n" +
            "Maecenas ornare posuere lacus ut rhoncus. Vivamus id facilisis arcu. Morbi accumsan felis at massa interdum fringilla. Maecenas pulvinar faucibus purus eget aliquet. Donec sollicitudin justo eu posuere mollis. Praesent ut augue efficitur, interdum diam sed, egestas mi. Suspendisse id condimentum libero. Nullam ultricies risus ut viverra aliquam. Vivamus molestie odio ex, sit amet suscipit ante feugiat in. Suspendisse vestibulum sapien id dapibus lobortis. In eget ante vel dui interdum dapibus a ut dolor. Curabitur vitae tincidunt nisi, quis varius urna. Integer eleifend tellus vitae diam suscipit, nec commodo odio tempor. Sed lorem turpis, rutrum eu egestas a, feugiat nec ipsum.\n" +
            "\n" +
            "Aliquam faucibus neque eu libero eleifend posuere. Fusce vel est et risus mattis accumsan. Suspendisse cursus ultricies nisi eu dignissim. Phasellus pulvinar nunc a lorem lacinia hendrerit. Nullam porttitor tempus tincidunt. Aliquam tristique diam quis eros maximus, nec viverra sapien dignissim. Etiam id erat eu nibh venenatis rutrum vitae id tortor. Integer finibus, erat quis dictum luctus, turpis orci vestibulum erat, sed tincidunt velit nisi sed odio. Etiam aliquam convallis rutrum. Vestibulum scelerisque elit ac justo bibendum, ut molestie augue auctor. Donec id erat arcu. Vestibulum dapibus ex a leo feugiat, sed condimentum magna porta. Sed placerat est neque. Etiam blandit ornare nunc ac pellentesque. Quisque vulputate condimentum erat, vitae interdum massa fringilla ac.\n" +
            "\n" +
            "Nunc lobortis blandit orci, id pretium elit condimentum non. Morbi at metus non lacus viverra volutpat sed quis lectus. Aenean commodo eleifend enim, non varius arcu varius ac. Etiam pretium varius malesuada. Vestibulum a accumsan lorem. Vestibulum elementum eleifend felis sed vulputate. Etiam euismod massa tempus, lacinia odio vitae, pharetra nunc. Curabitur dignissim iaculis ipsum id blandit. Donec at dui sit amet dolor eleifend cursus. Nulla facilisi. Mauris ultrices neque nec dui pulvinar maximus.\n" +
            "\n" +
            "Morbi tempor diam at mauris interdum, a ultricies urna rhoncus. Fusce imperdiet nisl felis, vel lacinia tortor faucibus sed. Vivamus sagittis sodales euismod. Maecenas accumsan, libero et elementum lobortis, dui nibh condimentum arcu, a pharetra purus tellus eget est. Etiam blandit rutrum bibendum. Ut eleifend accumsan risus. Vivamus nisi mi, tincidunt vel lobortis in, porta eu sapien. Curabitur nec quam in quam consequat vehicula a eu elit."
    }
]

export default FakeNews