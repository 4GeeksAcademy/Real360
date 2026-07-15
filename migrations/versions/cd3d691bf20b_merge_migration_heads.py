"""merge migration heads

Revision ID: cd3d691bf20b
Revises: 1af0aa2d02f8, b4730646c7e3
Create Date: 2026-07-14 16:33:53.568016

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cd3d691bf20b'
down_revision = ('1af0aa2d02f8', 'b4730646c7e3')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
