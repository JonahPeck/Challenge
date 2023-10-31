"""empty message

Revision ID: 12e0accabf88
Revises: e0f71bc0a169
Create Date: 2023-10-31 16:31:11.307736

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12e0accabf88'
down_revision = 'e0f71bc0a169'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ticket',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('created_by', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('response', sa.String(), nullable=True),
    sa.Column('status', sa.String(), server_default='New', nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('usertickets')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('usertickets',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.Column('response', sa.VARCHAR(), nullable=True),
    sa.Column('status', sa.VARCHAR(), server_default=sa.text("'New'"), nullable=True),
    sa.Column('created_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('email', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('ticket')
    # ### end Alembic commands ###