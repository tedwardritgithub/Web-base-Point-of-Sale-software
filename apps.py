from django.apps import AppConfig


class StoreConfig(AppConfig):
    name = 'store'
    default_auto_field = 'django.db.models.BigAutoField'
    verbose_name = 'My store'
    def ready(self):
        import store.signals
        
    
    
