from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate, ItemResponse

router=APIRouter(
    prefix="/items",
    tags=["Items"]
)

@router.post("/",response_model=ItemResponse)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db)
):
    new_item=Item(
        name=item.name,
        description=item.description
    )
    
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.get("/",response_model=list[ItemResponse])
def get_items(
    db: Session = Depends(get_db)
):
    items=db.query(Item).all()
    return items

@router.get("/{item_id}", response_model=ItemResponse)
def get_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    item=db.query(Item).filter(Item.id==item_id).first()
    
    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )
    
    return item


@router.put("/{item_id}", response_model=ItemResponse)
def update_item(
    item_id: int,
    item_data: ItemUpdate,
    db: Session = Depends(get_db)
):
    item=db.query(Item).filter(Item.id == item_id).first()
    
    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )
        
    item.name = item_data.name
    item.description = item_data.description
    
    db.commit()
    db.refresh(item)
    
    return item


@router.delete("/{item_id}")
def delete_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    item=db.query(Item).filter(Item.id == item_id).first()
    
    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )
        
    db.delete(item)
    db.commit()
    
    return{
        "message": "Item deleted successfully"
    }