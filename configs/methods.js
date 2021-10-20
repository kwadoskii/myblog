const DELETE = "DELETE";
const GET = "GET";
const PATCH = "PATCH";
const POST = "POST";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const DB_URI = process.env.DB_URI;
const URL = process.env.URL;

export { DELETE, GET, PATCH, POST, options as DB_OPTIONS, DB_URI, URL };
