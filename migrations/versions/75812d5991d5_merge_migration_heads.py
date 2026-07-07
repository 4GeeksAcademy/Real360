"""merge migration heads

Revision ID: 75812d5991d5
Revises: 21355bf47225, 739bd6bcd0ec
Create Date: 2026-07-07 15:42:26.099773

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '75812d5991d5'
down_revision = ('21355bf47225', '739bd6bcd0ec')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
