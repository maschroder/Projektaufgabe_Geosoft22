const mainMapInterface = new MapInterface(
    {
      mapid: "mainMap",
      view: [51.96034, 7.62245],
      zoom: 12,
      baseMap: {
        tileLayer: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    }
  );