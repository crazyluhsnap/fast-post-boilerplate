from fastapi import FastAPI

from app.db.database import Base, engine
from app.models.item import Item
from app.routers.items import router as items_router
from app.routers.health import router as health_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)

app.include_router(health_router, prefix="/api")

app.include_router(items_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Hackathon API is running"}
