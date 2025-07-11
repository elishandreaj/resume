<?= view('profile_info')?>

<div class="columns is-centered" style="gap: 1%; margin:0 auto; max-width: 120%; z-index: 1000px;">
  <div class="column is-6">
    <?php echo view('education'); ?>
  </div>
  <div class="column is-5">
    <?php echo view('skills'); ?>
  </div>
</div>

<?= view('employment') ?>
<?= view('projects') ?>
<?= view('extracurricular') ?>

<script>
    const BASE_URL = "<?= rtrim(base_url(), '/') ?>";
    const skillsData = <?= json_encode($skills ?? []) ?>;
</script>
<script src="<?= base_url('assets/js/scripts.js') ?>" defer></script>