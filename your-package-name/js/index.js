// import("../pkg/index.js").catch(console.error);

const rust = import("../pkg/index");

rust.then(m => m.greet("World!")).catch(console.error);
