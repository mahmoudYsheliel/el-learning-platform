from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
import bcrypt
from typing import Any, Annotated
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from database.mongo_driver import validate_bson_id
from database.mongo_driver import get_database

_jwt_key: str = 'randomkey'
algo = 'HS512'

# encoding access token function


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    print(to_encode)
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=1e6)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, _jwt_key, algorithm=algo)
    return encoded_jwt

# decoding access token function


def decode_jwt_token(token: str) -> dict[str, Any]:
    return jwt.decode(token, _jwt_key, algorithms=[algo])


# password hashing and verification
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


# authentication functions
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def auth_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, _jwt_key, algorithms=[algo])
        user_id: str = payload.get("userId")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user_id = validate_bson_id(user_id)
    if user_id is None:
        raise credentials_exception

    return user_id


async def create_verify_email_link(email: str):
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode = {'email': email, 'exp': expire}
    encoded = jwt.encode(to_encode, key=_jwt_key, algorithm=algo)
    return encoded


def check_verification_token(token: str):
    decoded = jwt.decode(token, key=_jwt_key, algorithms=[algo])
    return decoded


