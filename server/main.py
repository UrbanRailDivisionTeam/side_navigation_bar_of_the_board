from litestar import Litestar
from litestar.config.cors import CORSConfig
from litestar.static_files.config import create_static_files_router

cors_config = CORSConfig(allow_origins=["*"], allow_methods=["GET"])

static_files = create_static_files_router(
    path="/",
    directories=["static"],
    name="static",
    html_mode=True,
    include_in_schema=False,
)

app = Litestar(
    route_handlers=[
        static_files
    ],
    cors_config=cors_config,
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=12373)
