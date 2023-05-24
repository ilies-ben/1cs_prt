from oscar.apps.shipping import methods
from oscar.apps.shipping.repository import Repository as CoreRepository

class Repository(CoreRepository):
    methods = [
        methods.FixedPrice(
            charge_excl_tax=10,
            charge_incl_tax=12,
            description='Standard Shipping'
        ),
        methods.FixedPrice(
            charge_excl_tax=15,
            charge_incl_tax=18,
            description='Express Shipping'
        ),
    ]
